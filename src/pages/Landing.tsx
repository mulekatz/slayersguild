import React, { useEffect, useState } from "react";
import SlayerCardComponent from "@/components/SlayerCardComponent";
import { NftListType } from "@/types/types";

const randomSlayer = () => {
  return {
    tokenId: Math.floor(Math.random() * 666).toString(),
    owner: "",
  };
};

const cardClasses = [
  "absolute left-0 right-0 top-0 bottom-0 m-auto w-[320px] [--rotate-distance:3deg] [--translate-distance:-122px] lg:[--translate-distance:-312px] delay-500 shadow-lg animate-cards-slide",
  "absolute left-0 right-0 top-0 bottom-0 m-auto w-[320px] [--rotate-distance:-7deg] [--translate-distance:-46px] lg:[--translate-distance:-128px] delay-500 shadow-lg animate-cards-slide",
  "absolute left-0 right-0 top-0 bottom-0 m-auto w-[320px] [--rotate-distance:7deg] [--translate-distance:27px] lg:[--translate-distance:87px] delay-500 shadow-lg animate-cards-slide",
  "absolute left-0 right-0 top-0 bottom-0 m-auto w-[320px] [--rotate-distance:-3deg] [--translate-distance:115px] lg:[--translate-distance:325px] delay-500 shadow-lg animate-cards-slide",
];

const LandingPage = () => {
  const [slayers, setSlayers] = useState<NftListType[]>([]);

  useEffect(() => {
    const cache = JSON.parse(sessionStorage.getItem("slayersCache") || "{}");
    let data = cache.data || [];
    const lastUpdated = cache.lastUpdated;

    if (!lastUpdated || Date.now() - lastUpdated > 30000) {
      data = Array(4)
        .fill(0)
        .map(() => randomSlayer());
      sessionStorage.setItem(
        "slayersCache",
        JSON.stringify({
          data,
          lastUpdated: Date.now(),
        })
      );
    }

    setSlayers(data);
  }, []);

  return (
    <section className="relative flex w-full h-full">
      <div className="opacity-55">
        {slayers.map((slayer, index) => (
          <SlayerCardComponent
            key={slayer.tokenId}
            slayer={slayer}
            type="dummy"
            className={cardClasses[index]}
          />
        ))}
      </div>
      <div className="absolute w-full h-fit left-0 right-0 top-0 bottom-0 m-auto flex flex-col items-center justify-center gap-4 bg-background/65 px-8 py-4 rounded-lg">
        <h2 className="text-2xl sm:text-4xl lg:text-6xl -mb-4">Vechain</h2>
        <h1 className="text-4xl sm:text-6xl lg:text-8xl">Slayers Guild</h1>
        <p className="text-lg sm:text-xl lg:text-2xl text-center text-tertiary font-semibold">
          X-nodes will be destroyed.
          <br />
          But Slayers never die.
        </p>
      </div>
    </section>
  );
};

export default LandingPage;
