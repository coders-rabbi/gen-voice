import weather from "@/assets/home/weather.png";
import Image from "next/image";

const WeatherWidget = () => {
  return (
    <div className="bg-[#EAF3FF] py-16 grid md:grid-cols-12 gap-5 px-16">
      <div className="col-span-6 bg-amber-500">Rabbi</div>
      <div className="col-span-6 ">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-red-500/90 via-yello-600/85 to-teal-500/80 mixed-blend-multiply p-6 rounded-xl">
            <div className="flex flex-col md:flex-row justify-between">
              <div className="flex gap-2">
                <p className="text-white">Precipitation: 0%</p>
                <p className="text-white">Humidity: 41%</p>
                <p className="text-white">Wind: 27 km/h</p>
              </div>
              <div>
                <h4 className="text-xl text-white mb-2.5 font-semibold">
                  Ankara
                </h4>
                <p className="text-white text-sm">Tuesday 2:00 PM</p>
              </div>
            </div>
            <div className="flex justify-center mb-12">
              <div className="flex items-center gap-5 mt-12">
                <Image
                  src={weather}
                  alt="gen voice"
                  className="w-14 h-14 object-cover"
                />
                <h4 className="text-5xl text-white">
                  32<sup>oC</sup>
                </h4>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-yellow-500/90 via-cyan-600/85 to-teal-500/80 mixed-blend-multiply p-6 rounded-xl">
            <div className="flex justify-between">
              <div className="flex flex-col gap-2">
                <p className="text-white">Precipitation: 0%</p>
                <p className="text-white">Humidity: 41%</p>
                <p className="text-white">Wind: 27 km/h</p>
              </div>
              <div>
                <h4 className="text-xl text-white mb-2.5 font-semibold">
                  Ankara
                </h4>
                <p className="text-white text-sm">Tuesday 2:00 PM</p>
              </div>
            </div>
            <div className="flex justify-center mb-12">
              <div className="flex items-center gap-5 mt-12">
                <Image
                  src={weather}
                  alt="gen voice"
                  className="w-14 h-14 object-cover"
                />
                <h4 className="text-5xl text-white">
                  32<sup>oC</sup>
                </h4>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-600/90 via-cyan-600/85 to-teal-500/80 mixed-blend-multiply p-6 rounded-xl">
            <div className="flex justify-between">
              <div className="flex flex-col gap-2">
                <p className="text-white">Precipitation: 0%</p>
                <p className="text-white">Humidity: 41%</p>
                <p className="text-white">Wind: 27 km/h</p>
              </div>
              <div>
                <h4 className="text-xl text-white mb-2.5 font-semibold">
                  Ankara
                </h4>
                <p className="text-white text-sm">Tuesday 2:00 PM</p>
              </div>
            </div>
            <div className="flex justify-center mb-12">
              <div className="flex items-center gap-5 mt-12">
                <Image
                  src={weather}
                  alt="gen voice"
                  className="w-14 h-14 object-cover"
                />
                <h4 className="text-5xl text-white">
                  32<sup>oC</sup>
                </h4>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-600/90 via-cyan-600/85 to-teal-500/80 mixed-blend-multiply p-6 rounded-xl">
            <div className="flex justify-between">
              <div className="flex flex-col gap-2">
                <p className="text-white">Precipitation: 0%</p>
                <p className="text-white">Humidity: 41%</p>
                <p className="text-white">Wind: 27 km/h</p>
              </div>
              <div>
                <h4 className="text-xl text-white mb-2.5 font-semibold">
                  Ankara
                </h4>
                <p className="text-white text-sm">Tuesday 2:00 PM</p>
              </div>
            </div>
            <div className="flex justify-center mb-12">
              <div className="flex items-center gap-5 mt-12">
                <Image
                  src={weather}
                  alt="gen voice"
                  className="w-14 h-14 object-cover"
                />
                <h4 className="text-5xl text-white">
                  32<sup>oC</sup>
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
