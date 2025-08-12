export default function WoltPlusCard() {
  return (
    <div className="relative w-full h-[300px] md:h-[400px] lg:h-[560px] bg-white rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer group">
      <div className="absolute inset-0 transition-transform duration-300 ease-in-out group-hover:scale-105">
        <img
          src="https://images.ctfassets.net/23u853certza/5926qGJB2hSNE15qHWNLZn/388c6afaf9c273c328d6ec824f10b0e1/photocard_woltplus.jpg?w=960&q=90&fm=webp"
          alt="Wolt Plus"
          className="w-full h-full object-cover select-none"
          loading="lazy"
          decoding="async"
          draggable="true"
        />
      </div>

      {/* Overlay for interaction feedback */}
      <div
        className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"
        style={{
          backgroundImage:
            "url(https://cdn.builder.io/api/v1/image/assets%2F86f4e443f35a4609b52c42bedac1a4c2%2F140011b8442949cba59f414841f8b75b)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      ></div>
    </div>
  );
}
