import Card2 from "../Card2";

export default function ItalianDishes() {
  const Dishes = [
    "Pizza",
    "Pasta",
    "Spaghetti",
    "Lasagna",
    "Rissoto alla Milanese",
    "Tiramisu",
  ];
  return (
    <div className="flex flex-wrap w-full h-screen justify-center items-center gap-6">
      {Dishes.map((dish, idx) => (
        <div
          key={idx}
          className="w-[30%] min-w-[250px] hover:scale-105 transition-transform duration-300 "
        >
          <Card2
            key={idx}
            Cataegory={dish}
            src={`/public/images/${dish}.jpg`}
          />
        </div>
      ))}
    </div>
  );
}
