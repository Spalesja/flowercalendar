export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-[#f5f5f5]">
      <main className="flex flex-col items-center gap-6 text-center px-4">
        <div className="text-5xl">🌸</div>
        <h1 className="text-3xl font-bold text-[#1a1a1a]">
          Найди свой цветок
        </h1>
        <p className="text-lg text-[#4a4a4a] max-w-md">
          Цветочный календарь Беларуси — узнай, что цветёт в твоём городе прямо
          сейчас
        </p>
        <div className="mt-4 rounded-full bg-[#a64ac9] px-8 py-3 text-white font-medium">
          Скоро здесь будет поиск
        </div>
      </main>
    </div>
  );
}
