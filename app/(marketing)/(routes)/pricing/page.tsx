import React from "react";
import PricingCard from "../../_components/pricing-card";

const Pricing = () => {
  return (
    <section className="container flex flex-col  gap-6 py-8 md:max-w-[64rem] md:py-12 lg:py-24">
      <div className="mx-auto flex w-full flex-col gap-4 md:max-w-[58rem]">
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          Simple, transparent pricing
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Unlock all features & participate in lucky draws
        </p>
      </div>
      <PricingCard features={["500 Credits" , "Daily free Coupons" , "Daily 15 free credits", "Access to Random Draw"]} price="39" label="Premium" />
      <PricingCard features={["300 Credits" , "Weekly free Coupons" , "Daily 10 free credits", "Access to Random Draw"]} price="29" label="Pro"/>
      <PricingCard features={["100 Credits" , "Monthly free Coupons" , "Daily 5 free credits", "Access to Random Draw"]} price="19" label="Standard"/>
    </section>
  );
};

export default Pricing;
