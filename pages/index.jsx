import Layout from "../components/Layout";
import {
  faCalendarAlt,
  faClock,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import readingTime from "../helpers/readingTime";
import formatDate from "../helpers/formatDate";
import Link from "next/link";
import { useRouter } from "next/router";
import DeleteButton from "../components/buttons/DeleteButton";
import EditButton from "../components/buttons/EditButton";

export async function getServerSideProps() {
  const apiURL = process.env.URL;
  const response = await fetch(apiURL);
  const data = await response.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      posts: data,
    },
  };
}

export default function Home({ posts }) {
  const router = useRouter();

  const refreshData = async () => {
    await router.replace(router.asPath);
  };

  return (
    <div>
      <Layout title="Home" />
      <div className="px-2 lg:pl-auto xl:container mx-auto mb-5">
        <div className="flex flex-row-reverse">
          <button
            onClick={(e) => {
              e.preventDefault();
              router.push("/blog/add");
            }}
            className="w-full md:w-auto px-8 py-2 border mt-3 shadow text-green-500 rounded hover:text-white hover:bg-green-400 hover:shadow-inner focus:text-white focus:bg-green-400 focus:shadow-inner"
          >
            <FontAwesomeIcon className="mr-2" icon={faPlusCircle} />
            <span>Add Post</span>
          </button>
        </div>
        {posts.map((post) => (
          <div
            key={post.id}
            className="mt-5 mb:mt-12 divide-y border p-10 rounded shadow"
          >
            <div className="block md:flex md:justify-between">
              <Link href="/blog/[id]" as={`/blog/${post.id}`}>
                <a className="text-xl font-bold w-full md:w-3/4">
                  {post.title}
                </a>
              </Link>
              <div className="mt-2 flex space-x-12 md:space-x-5 md:mt-0 md:inline-block md:align-middle">
                <DeleteButton id={post.id} />
                <EditButton id={post.id} />
              </div>
            </div>
            <div className="mt-2 text-gray-500 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
              <div className="col-span-1 flex">
                <i className="mr-2 p-auto">
                  <FontAwesomeIcon icon={faCalendarAlt} />
                </i>
                <p className="my-auto">{formatDate(post.published_at)}</p>
              </div>
              <div className="col-span-1 flex">
                <i className="mr-2 p-auto">
                  <FontAwesomeIcon icon={faClock} />
                </i>
                <p className="my-auto">{readingTime(post.content)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
