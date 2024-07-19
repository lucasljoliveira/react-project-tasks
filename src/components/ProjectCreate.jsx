import { useRef, forwardRef } from 'react';
import Input from './Input';


const ProjectCreate = forwardRef(function ProjectCreate({ handleAddProject, handleClose }, ref) {
    const title = useRef();
    const description = useRef();
    const date = useRef();

    function handleSubmit(){
        const enteredTitle = title.current.value;
        const enteredDescription = description.current.value;
        const enteredTDate = date.current.value;
        // validation
        if (enteredTitle.trim() === "" || enteredDescription.trim() === "" || enteredTDate.trim() === "") {
            ref.current.open();
            return;
        }
        handleAddProject(
            {
                title: enteredTitle,
                description: enteredDescription,
                date: enteredTDate,
                tasks: []
            }
        )
    };

    return (
        <div className="w-[35rem] mt-16">
            <menu className="flex items-center justify-end gap-4 my-4">
                <li>
                    <button
                        type="button"
                        className="text-stone-800 hover:text-stone-950"
                        onClick={handleClose}
                        >Cancel
                    </button>
                </li>
                <li>
                    <button 
                        type="button"
                        onClick={handleSubmit}
                        className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
                        >Save
                    </button>
                </li>
            </menu>
            <div className="mt-24 text-center w-2/3">
                <Input ref={title} label="Title" type="text" />
                <Input ref={description} label="Description" isTextArea/>
                <Input ref={date} label="Due Date" type="date" />
            </div>
    </div>
    )
});

export default ProjectCreate;
