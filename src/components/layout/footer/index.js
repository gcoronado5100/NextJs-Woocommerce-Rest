import Link from "next/link";
import { sanitize } from "../../../utils/miscellaneous";
import { isEmpty, isArray } from "lodash";
import { useEffect, useState } from "react";

const Footer = ({ footer }) => {
  // console.log("footer", footer);

  const { copyrightText, footerMenuItems, sidebarOne, sidebarTwo } = footer;
  const [isMounted, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  return (
    <>
      <footer className='bg-blue-600 p-6'>
        <div className='flex flex-wrap -mx-1 overflow-hidden text-white'>
          {isMounted && (
            <>
              {/* Widget One */}
              <div className='my-1 px-1 w-full overflow-hidden sm:w-full lg:w-1/2 xl:w-1/3'>
                <div
                  dangerouslySetInnerHTML={{ __html: sanitize(sidebarOne) }}
                />
              </div>
              {/* Widget Two */}
              <div className='my-1 px-1 w-full overflow-hidden sm:w-full lg:w-1/2 xl:w-1/3'>
                <div
                  dangerouslySetInnerHTML={{ __html: sanitize(sidebarTwo) }}
                />
              </div>
            </>
          )}
          {/* Footer Menu */}
          <div className='my-1 px-1 w-full overflow-hidden sm:w-full lg:w-1/2 xl:w-1/3'>
            {!isEmpty(footerMenuItems) && isArray(footerMenuItems) ? (
              <ul>
                {footerMenuItems.map((menuItem) => (
                  <li key={menuItem?.ID}>
                    <Link href={menuItem?.url}>{menuItem?.title}</Link>
                  </li>
                ))}
              </ul>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className='my-8 w-full flex flex-wrap'>
          {/* Copyright Text */}
          <div className='w-full md:w-1/2 lg:w-1/4 text-white'>
            {copyrightText ? copyrightText : "&copy; GabeCode 2023"}
          </div>
          {/*  */}
          <div className='w-full lg:w-3/4 justify-end'></div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
