import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Toast, Swal } from "../../helpers/swal";
import { useRouter } from "next/router";

export default function DeleteButton({ id }) {
  const router = useRouter();

  const refreshData = async () => {
    await router.replace("/");
  };

  const deletePost = async (e) => {
    e.preventDefault();
    try {
      const { isConfirmed } = await Swal.fire({
        title: "Are you sure to delete?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });
      if (isConfirmed) {
        await fetch(process.env.URL + id, { method: "DELETE" });
        await refreshData();
        Toast.fire({ icon: "success", title: "Delete post success!" });
      }
    } catch (error) {
      Toast.fire({ icon: "error", title: "Something went wrong!" });
    }
  };
  return (
    <button onClick={deletePost} className="text-red-500 hover:text-red-400">
      <FontAwesomeIcon icon={faTrash} />
      <span>Delete</span>
    </button>
  );
}
