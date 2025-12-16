import BoardWriteForm from "@/components/board/BoardWriteForm";

export default function EditPage({ params }) {
    return <BoardWriteForm mode="edit" pid={params.pid} />;
}
