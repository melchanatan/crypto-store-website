import Navbar from "@/components/global/Navbar";
import HeroSection from "@/components/hero/HeroSection";
import FeatureSection from "@/components/feature/FeatureSection";
import TrendingSection from "@/components/trending/TrendingSection";
import UserCartProvider from "@/utils/UserCartProvider";
export default function Home() {
  return (
    <main className="">
      <UserCartProvider>
        <Navbar />
        <HeroSection />
        <div className="w-[90%] mx-auto h-[1px] bg-gray-200 my-10"></div>
        <FeatureSection />
        <TrendingSection />
      </UserCartProvider>
    </main>
  );
}
