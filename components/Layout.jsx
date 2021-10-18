import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
export default function Layout(props) {
  return (
    <div>
      <Head>
        <title>{props.title}</title>
      </Head>
      <div className="border-bottom border shadow-sm">
        <div className="xl:container mx-auto grid grid-cols-3">
          <div className="grid md:hidden md:order-last grid-cols-3 col-span-3 md:col-span-1 gap-4 p-5">
            <div className="col-span-1 mx-auto">
              <Image
                height={80}
                width={80}
                className="rounded-full border max-h-16 mx-auto"
                src="https://avatars.dicebear.com/api/croodles-neutral/Fitrah%20Lamusu.svg"
                alt="avatar"
              />
            </div>
            <div className="col-span-2">
              <div>
                <p className="text-xl font-semibold">Fitrah Lamusu</p>
                <p className="antialiased text-sm text-gray-500">
                  Front-end Engineer <br />
                  Maybank Indonesia
                </p>
              </div>
            </div>
          </div>
          <div className="flex md:justify-between col-span-3 justify-center h-14 p-3 inline-block align-middle md:order-first">
            <nav className="hidden md:flex ">
              <Image
                height={50}
                width={50}
                className="rounded-full mr-4 ml-8 lg:ml-0 border"
                src="https://avatars.dicebear.com/api/croodles-neutral/Fitrah%20Lamusu.svg"
                alt="avatar"
              />
              <span className="text-sm font-semibold my-auto">
                Fitrah Lamusu
              </span>
            </nav>
            <nav className="grid gap-4 grid-cols-4 justify-items-center text-gray-500 font-semibold text-center">
              <Link href="/">
                <a className="hover:text-black">Blog</a>
              </Link>
              <Link href="/">
                <a className="hover:text-black">Bookshelf</a>
              </Link>
              <Link href="/">
                <a className="hover:text-black">Focus</a>
              </Link>
              <Link href="/">
                <a className="hover:text-black">About</a>
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
