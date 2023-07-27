import { useForm } from "react-hook-form";
import { useTask } from "../context/TaskContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

function TaskFormPage() {
  const { register, handleSubmit } = useForm();
  const { createTask,getTask } = useTask();
  const navigate = useNavigate();
  const params = useParams();

  const onSubmit = (data) => {
    createTask(data);
    navigate("/tasks");
  };

  useEffect(() => {
    if (params.id) {
      getTask(params.id);
    }
  }, []);


  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md item">
        <h1 className="text-2xl font-bold">Add new task</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Title"
            {...register("title")}
            autoFocus
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          />
          <textarea
            rows="3"
            placeholder="Description"
            {...register("description")}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          ></textarea>

          <button>Save</button>
        </form>
      </div>
    </div>
  );
}

export default TaskFormPage;
