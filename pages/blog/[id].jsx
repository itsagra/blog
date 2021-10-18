import Layout from "../../components/Layout";
import { faCalendarAlt, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import readingTime from "../../helpers/readingTime";
import formatDate from "../../helpers/formatDate";
import parse from "html-react-parser";
import EditButton from "../../components/buttons/EditButton";
import DeleteButton from "../../components/buttons/DeleteButton";

export async function getServerSideProps({ query: { id } }) {
  const apiURL = process.env.URL + id;
  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    return {
      props: {
        post: data,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

const Blog = ({ post }) => {
  return (
    <div>
      <Layout title={post.title} />
      <div className="xl:container">
        <div className="mt-5 border-b md:mt-12">
          <h1 className=" text-3xl font-bold text-left pl-5 md:pl-0 md:text-center">
            {post.title}
          </h1>

          <div className="text-left pl-5 mt-2 md:text-center">
            <DeleteButton id={post.id} />
            <EditButton id={post.id} />
          </div>
        </div>

        <div className="text-gray-500 text-center flex justify-left pl-4 md:justify-center mt-2">
          <div className="col-span-1 flex mx-2">
            <i className="mr-2 p-auto">
              <FontAwesomeIcon icon={faCalendarAlt} />
            </i>
            <p className="my-auto">{formatDate(post.published_at)}</p>
          </div>
          <div className="col-span-1 flex mx-2">
            <i className="mr-2 p-auto">
              <FontAwesomeIcon icon={faClock} />
            </i>
            <p className="my-auto">{readingTime(post.content)}</p>
          </div>
        </div>

        <div className="mt-5 p-5">{parse(post.content)}</div>
      </div>
    </div>
  );
};

export default Blog;
