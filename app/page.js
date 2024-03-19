import ObjectDetection from "./components/object-detection";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-2 p-8">
      <h1 className="gradient-title font-extrabold text-3xl md:text-6xl lg:text-8xl tracking-tighter md:px-6 text-center">
        Face Detection Alarm
      </h1>
      <ObjectDetection />
    </main>
  );
}
