import { Mail, Phone } from "lucide-react";
import Link from "next/link";
import {
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiOutlineX,
} from "react-icons/ai";

const Footer = () => {
  return (
    <div className="py-6 bg-[#013a6f] mt-20">
      <div className="px-2 md:container mx-auto flex justify-between items-center flex-wrap gap-4">
        <Link className="text-white flex" href={"mailto:webadmin@summitcl.com"}>
          <Mail className="text-sm" />
          webadmin@summitcl.com
        </Link>
        <Link className="text-white flex" href={"mailto:webadmin@summitcl.com"}>
          <Phone className="text-sm" />
          Phone: +256 782610333
        </Link>
      </div>
    </div>
  );
};

export default Footer;
