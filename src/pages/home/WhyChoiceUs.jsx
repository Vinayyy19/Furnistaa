import {
  Smile,
  Truck,
  Wrench,
  ShieldCheck,
  Headset,
  Lock,
} from "lucide-react";

const WhyChoiceUs = () => {
  return (
    <div className="w-full flex justify-center px-4">
      <div className="flex items-center gap-10 border rounded-xl px-6 py-6 shadow-sm 
                      overflow-x-auto hide-scrollbar max-w-full">

        <div className="min-w-[120px] text-primary font-semibold text-lg leading-tight">
          Why <br /> Furnista?
        </div>

        <Feature icon={<Smile size={28} />} text="25 Lakhs+ Customers" />
        <Feature icon={<Truck size={28} />} text="Free Shipping" />
        <Feature icon={<Wrench size={28} />} text="Free Installation" />
        <Feature icon={<ShieldCheck size={28} />} text="Best Warranty" />
        <Feature icon={<Headset size={28} />} text="Customer Support" />
        <Feature icon={<Lock size={28} />} text="Secure Payment" />
      </div>
    </div>
  );
};

const Feature = ({ icon, text }) => {
  return (
    <div className="min-w-[110px] flex flex-col items-center gap-2 text-neutral-400">
      <div className="w-12 h-12 flex items-center justify-center rounded-full 
                      bg-purple-200 text-primary-dark">
        {icon}
      </div>
      <div className="text-sm text-center">
        {text}
      </div>
    </div>
  );
};

export default WhyChoiceUs;
