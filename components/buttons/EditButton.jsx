import Link from "next/link";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function EditButton({ id }) {
  return (
    <Link href="/blog/edit/[id]" as={`/blog/edit/${id}`}>
      <a className="ml-5 text-blue-500 hover:text-blue-400">
        <FontAwesomeIcon icon={faEdit} />
        <span>Edit</span>
      </a>
    </Link>
  );
}
