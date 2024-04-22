<template>
    <div class="canvas__container" ref="containerRef">
        <canvas class="canvas__screen" id="canvas" ref="canvasRef"></canvas>
    </div>
    <div class="canvas__wrapper">
        <!-- Display a message if no points are selected -->
        <h2 class="canvas__message" v-if="selectedPoints.length === 0">Click on the screen to select points 👆</h2>
        <div v-else class="canvas__info">
            <!-- Display selected points, parallelogram area, and circle area -->
            <p>Selected Points: {{ selectedPoints }}</p>
            <p>Parallelogram Area: {{ parallelogramArea }}</p>
            <p>Circle Area: {{ circleArea }}</p>
        </div>
        <div class="canvas__controls">
            <!-- Buttons for About and Reset actions -->
            <Button @click="toggleAboutModal">About</Button>
            <Button class="secondary" @click="reset">Reset</Button>
        </div>
    </div>
    <!-- Modal component for displaying additional information -->
    <Modal :header="modalData.header" :showModal="showModal" @close="showModal = false">
        <div>
            {{ modalData.content }}
        </div>
    </Modal>
</template>

<script lang="ts">
import {
    drawPoint,
    drawParallelogram,
    drawCircle,
    calculateParallelogramArea,
} from '../../utils/geometrics.ts';
import './CanvasPanel.scss';
import { modalData } from '../../assets/staticData.ts';
import Button from '../../components/Button/Button.vue';
import Modal from '../../components/Modal/Modal.vue';

export default {
    name: 'CanvasPanel',
    components: {
        Button,
        Modal
    },
    data() {
        return {
            containerRef: null,
            canvasRef: null,
            selectedPoints: [] as { x: number, y: number }[],
            parallelogramArea: 0,
            circleArea: 0,
            canvas: {} as HTMLCanvasElement,
            ctx: null as CanvasRenderingContext2D | null,
            isDragging: false,
            draggedPointIndex: null as number | null,
            showModal: false,
            modalData
        };
    },
    mounted() {
        // Initialize canvas and event listeners
        this.canvas = this.$refs.canvasRef as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d');
        this.canvas.addEventListener('click', this.handleClick);
        this.canvas.addEventListener('mousedown', this.handleMouseDown);
        this.canvas.addEventListener('mousemove', this.handleMouseMove);
        this.canvas.addEventListener('mouseup', this.handleMouseUp);
        this.setCanvasSize();
        window.addEventListener('resize', this.setCanvasSize);
    },
    beforeUnmount() {
        // Remove event listener on component unmount
        window.removeEventListener('resize', this.setCanvasSize);
    },
    methods: {
        reset() {
            // Reset selected points, areas, and modal state
            this.selectedPoints = [];
            this.parallelogramArea = 0;
            this.circleArea = 0;
            this.showModal = false;
            this.clearCanvas();
        },
        toggleAboutModal() {
            // Toggle the About modal
            this.showModal = !this.showModal;
        },
        handleClick(event: MouseEvent) {
            if (this.selectedPoints.length < 3 && this.ctx) {
                // Handle click event to select points
                const rect = this.canvas.getBoundingClientRect();
                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;
                this.selectedPoints.push({ x, y });
                drawPoint(this.ctx, x, y);
                if (this.selectedPoints.length === 3) {
                    // Draw parallelogram and circle when three points are selected
                    drawParallelogram(this.ctx, this.selectedPoints);
                    drawCircle(this.ctx, this.selectedPoints);
                    this.calculateAreas();
                }
            }
        },
        setCanvasSize() {
            // Set canvas size based on container size
            const container = this.$refs.containerRef as HTMLElement;
            const containerWidth = container.offsetWidth;
            const containerHeight = container.offsetHeight;

            this.canvas.width = containerWidth;
            this.canvas.height = containerHeight;
            this.reset();
        },
        calculateAreas() {
            // Calculate parallelogram area and circle area
            const [p1, p2, p3] = this.selectedPoints;
            this.parallelogramArea = calculateParallelogramArea(p1, p2, p3);
            // Calculate circle area based on parallelogram area
            this.circleArea = Math.PI * Math.pow(Math.sqrt(this.parallelogramArea / Math.PI), 2);
        },
        clearCanvas() {
            // Clear the canvas
            this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
        },
        handleMouseDown(event: MouseEvent) {
            // Handle mouse down event for dragging points
            const rect = this.canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const clickedPointIndex = this.selectedPoints.findIndex(
                // Find the clicked point within a radius of 11 pixels
                (point) => Math.sqrt(Math.pow(point.x - x, 2) + Math.pow(point.y - y, 2)) < 11
            );
            if (clickedPointIndex !== -1) {
                this.isDragging = true;
                this.draggedPointIndex = clickedPointIndex;
            }
        },
        handleMouseMove(event: MouseEvent) {
            if (this.isDragging && this.draggedPointIndex !== null && this.ctx) {
                // Handle mouse move event for dragging points
                const rect = this.canvas.getBoundingClientRect();
                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;

                this.ctx.save(); // Save the current canvas state
                this.selectedPoints[this.draggedPointIndex] = { x, y };
                this.clearCanvas();
                this.selectedPoints.forEach((point) => drawPoint(this.ctx as CanvasRenderingContext2D, point.x, point.y));
                drawParallelogram(this.ctx, this.selectedPoints);
                drawCircle(this.ctx, this.selectedPoints);
                this.calculateAreas();

                this.ctx.restore(); // Restore the saved canvas state
            }
        },
        handleMouseUp() {
            // Handle mouse up event for dragging points
            this.isDragging = false;
            this.draggedPointIndex = null;
        }
    }
};
</script>