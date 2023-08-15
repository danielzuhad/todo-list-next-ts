import { Input } from "./components/Input";
import Submit from "./components/Submit";
import { TodoCard } from "./components/TodoCard";
import { handleSubmit } from "./handlers/submitHandler";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <h1 className=" font-bold text-center mt-[15vh]">TODO LIST</h1>
      <span className="p-2 text-center">
        Make Your Daily Routine Structured. Type Your Task In Input Below Here
      </span>

      <div className="flex sm:flex-col min-w-[40vw] md:flex-row justify-center items-center md:items-center mt-[2em]">
        <Input />
        {<Submit onClick={handleSubmit} />}
      </div>

      {/* Task Card */}
      <div className="mt-[4em] w-full">
        <TodoCard />
      </div>
    </div>
  );
}
