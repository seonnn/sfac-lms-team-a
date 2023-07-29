import { LectureComment, User } from "@/types/firebase.types";
import { db } from "@/utils/firebase";
import { useQuery } from "@tanstack/react-query";
import {
  DocumentData,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const fetchLectureComment = async (docId: string, parentId: string) => {
  const q = query(
    collection(db, "lectureComments"),
    where("lectureId", "==", doc(db, "lectures", docId)),
    where("parentId", "==", parentId),
  );

  const letcureComments: DocumentData[] = [];
  const querySnapshot = await getDocs(q);

  for (const doc of querySnapshot.docs) {
    const docData = doc.data();
    const commentId = doc.id;
    const userSnap = await getDoc(docData.userId);
    const user = (await userSnap.data()) as User;

    letcureComments.push({ id: commentId, ...docData, user });
  }
  return letcureComments;
};

const useGetLectureCommentQuery = (docId: string, parentId: string) => {
  return useQuery(
    ["LectureComment", docId],
    async () => await fetchLectureComment(docId, parentId),
    { refetchOnWindowFocus: false },
  );
};
export default useGetLectureCommentQuery;
