import React, { useContext } from "react";
import Image from "next/image";
import { Suspense, lazy } from "react";
import { FaEthereum } from "react-icons/fa";
import Button from "@/components/global/Button";
import { IoIosHeartEmpty } from "react-icons/io";
import { UserInfoContext } from "@/utils/UserInfoProvider";

const FeatureListView = ({ children }) => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ul className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-5 padding-page">
        {children}
      </ul>
    </Suspense>
  );
};

const ListItem = ({ productInfo }) => {
  const { name, description, price, id } = productInfo;
  const { userInfo } = useContext(UserInfoContext);

  const addItemToCart = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/cart-item/`,
      {
        'method': 'POST',
        headers: {
          'Authorization': `Bearer ${userInfo.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'product_id': id,
          'user_id': userInfo.id,
        })
      })
    const data = await response.json()
  };

  return (
    <li className="p-3 bg-white shadow-md flex flex-col items-center rounded-xl border-gray-300 border-[1px] gap-3">
      <div className="relative">
        <Image
          src={"/collection/c2-1.jpg"}
          width={400}
          height={50}
          alt="image"
          className="rounded-lg"
        />
        <span className="absolute top-[10px] right-[10px]  flex flex-row gap-[6px]">
          <p className="glass-blur px-2 py-1 border-lg text-sm">5 h 20m 52s</p>
          <button className="flex justify-center items-center p-1 glass-blur w-[32px] h-[32px]">
            <IoIosHeartEmpty className="w-[20px] h-[20px]" />
          </button>
        </span>
      </div>
      <article className="flex-col flex items-start w-full">
        <h3 className="text-black capitalize text-lg font-semibold leading-[100%]">
          {name}
        </h3>
        <p className="text-gray-500 mb-3 capitalize">by {description}</p>
        <div className="flex flex-row w-full items-end justify-between ">
          <div className="">
            <p className="text-gray-500 text-sm">current bid</p>
            <div className="flex items-center gap-2 flex-row">
              <FaEthereum></FaEthereum>
              <p className="text-black font-semibold">{price} ETH</p>
            </div>
          </div>
          <Button text="Place a bid" isSmall={true} onClick={addItemToCart} ></Button>
        </div>
      </article>
    </li>
  );
};

const GridDisplay = () => {
  return (
    <div className="grid grid-cols-2 gap-3 [&>*]:rounded-lg bg-bg p-4 rounded-xl">
      <div className=" col-span-2 flex flex-row relative">
        <span className="absolute right-[10px] top-[10px] flex flex-row gap-2 items-center">
          <IoIosHeartEmpty className="w-[20px] h-[20px]" />
          25
        </span>
        <Image
          src={"/default-avatar.jpeg"}
          width={48}
          height={48}
          className="rounded-full"
        />

        <div className="flex flex-col ml-4">
          <h4>NFT Collector</h4>
          <p className="text-gray-300">@melchs_</p>
        </div>
      </div>
      <Image
        src={"/collection/c2-1.jpg"}
        width={400}
        height={50}
        className="row-span-2 h-full bg-cover object-cover"
      />
      <Image
        src={"/collection/c2-1.jpg"}
        width={400}
        height={50}
        className=""
      />
      <Image
        src={"/collection/c2-1.jpg"}
        width={400}
        height={50}
        className=""
      />
    </div>
  );
};


FeatureListView.ListItem = ListItem;
FeatureListView.GridDisplay = GridDisplay;
export default FeatureListView;
