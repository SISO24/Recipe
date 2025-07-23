import Card2 from "../Card2";

export default function ChineseDishes() {
  const Dishes = [
    "Noodles",
    "Spring Roll",
    "Chilli Paneer",
    "Manchurian",
    "Fried Rice",
    "Honey Chilli Potato",
  ];
  return (
    <div className="flex flex-wrap w-full h-screen justify-center items-center gap-6">
      {Dishes.map((dish, idx) => (
        <div
          key={idx}
          className="w-[30%] min-w-[250px] hover:scale-105 transition-transform duration-300 "
        >
          <Card2 key={idx} Cataegory={dish} src={`/images/${dish}.jpg`} />
        </div>
      ))}
    </div>
  );
}
