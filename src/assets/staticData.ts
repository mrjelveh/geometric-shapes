export const modalData: {
    header: string;
    content: string;
} = {
    "header": "About",
    "content":  `This program allows you to select three arbitrary points within the browser window. As you select the
        points, the program draws red circles at their locations.

        Based on the three selected points, the program draws a blue parallelogram with three of its corners at the
            selected points, and a yellow circle with the same area and center of mass as the parallelogram.

        You can move the selected points by clicking and dragging them, which will update the shapes and their
            respective areas accordingly.
            
        The "Reset" button clears the canvas and allows you to select three new points, repeating the process.
        This program was created by Moreza as part of a coding task.`
    };