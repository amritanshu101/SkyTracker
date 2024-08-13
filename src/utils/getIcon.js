import { ImCloud } from "react-icons/im";
import {
  IoMdThunderstorm,
  IoIosRainy,
  IoIosSnow,
  IoMdSunny,
} from "react-icons/io";
import { BsCloudDrizzleFill, BsCloudFog2Fill } from "react-icons/bs";

let icon

export function getIcon(weatherData) {
    switch (weatherData) {
        case "Clear":
          icon = <IoMdSunny className="text-yellow-300" />;
          break;
        case "Clouds":
          icon = <ImCloud className="text-gray-100" />;
          break;
        case "Thunderstorm":
          icon = <IoMdThunderstorm className="text-gray-800" />;
          break;
        case "Drizzle":
          icon = <BsCloudDrizzleFill className="text-gray-200" />;
          break;
        case "Rain":
          icon = <IoIosRainy className="text-gray-400" />;
          break;
        case "Snow":
          icon = <IoIosSnow className="text-blue-400" />;
          break;
        default:
          icon = <BsCloudFog2Fill className="text-gray-600" />;
      }

      return icon
}