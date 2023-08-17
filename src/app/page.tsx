import CardSection from "@/components/CardSection";
import InputSection from "@/components/InputSection";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <h1 className=" font-bold text-center mt-[15vh]">TODO LIST</h1>
      <span className="p-2 text-center">
        Make Your Daily Routine Structured. Type Your Task In Input Below Here
      </span>
      <InputSection />
      <CardSection />
    </div>
  );
}
