import React, { useState } from 'react';
import { EstimateModal } from './Modal';
import { Slider } from './ui/slider';
import { cn } from '@/lib/utils';

const Hero: React.FC = () => {
  const maxNight = 30;

  const [costPerNight, setCostPerNight] = useState(194);
  const [locationValue, setLocationValue] = useState<string>("kl");

  const [totalNight, setTotalNight] = useState(9);

  const klMapUrl = "https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d127641.79978167308!2d101.61295005!3d3.1385036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sairbnb%20kuala%20lumpur!5e0!3m2!1sen!2smy!4v1699876543210!5m2!1sen!2smy";
  const pjMapUrl = "https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d127657.123456789!2d101.62987654!3d3.1071234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sairbnb%20petaling%20jaya!5e0!3m2!1sen!2smy!4v1699876543210!5m2!1sen!2smy";
  const shahAlamMapUrl = "https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d127665.987654321!2d101.51876543!3d3.0734567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sairbnb%20shah%20alam!5e0!3m2!1sen!2smy!4v1699876543210!5m2!1sen!2smy";
  const onValueChange = (value: number[]) => {
    setTotalNight(value[0]);
  }

  return (
    <>
      <section className="pt-20 pb-12 px-10">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-row gap-12 items-center justify-center mx-24 mt-20">
            {/* Left Side - Text Content */}
            <div className="space-y-8 flex-1">
              <div className="space-y-6">
                <h1 className="text-5xl font-bold text-gray-900 leading-tight">
                  Your home could make RM{(totalNight * costPerNight).toLocaleString('en-US')} on Airbnb
                </h1>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                  {totalNight} nights·RM{costPerNight}/night
                </p>
                <Slider className={cn("w-[60%]")} defaultValue={[totalNight]} max={maxNight} step={1} min={1} onValueChange={onValueChange} />
              </div>
              <EstimateModal setLocationValue={setLocationValue} setCostPerNight={setCostPerNight} />


            </div>

            {/* Right Side - Google Map */}
            <div className="w-full h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl flex-1">
              <iframe
                src={locationValue === "kl" ? klMapUrl : locationValue === "pj" ? pjMapUrl : shahAlamMapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Map - Kuala Lumpur"
              ></iframe>
            </div>
          </div>
        </div>
      </section>


    </>
  );
};

export default Hero;
