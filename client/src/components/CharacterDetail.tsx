import ButtonLike from "../common/ButtonLike";
import PersonDescription from "../common/PersonDescription";
import { Link, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { GET_DETAIL_PERSON } from "../services/query/get-detail-person";
import Loading from "../common/Loading";
import { TOGGLE_LIKE } from "../services/mutations/toggle-like";
import FormComment from "../common/FormComment";
import { GET_COMMENTS_PERSON } from "../services/query/get-comments-person";
import { Comment } from "../types/comment.types";

const CharacterDetail = () => {
  const [toggleLike] = useMutation(TOGGLE_LIKE);
  const { id } = useParams<{ id: string }>();
  const personId = Number(id);
  const { data, loading } = useQuery(GET_DETAIL_PERSON, {
    variables: { id },
  });

  const {
    data: commentsData,
    loading: commentsLoading,
    refetch: refetchComments,
  } = useQuery(GET_COMMENTS_PERSON, {
    variables: { personId },
  });

  const handleCommentAdded = async () => {
    await refetchComments();
  };

  const handleLikeToggle = async () => {
    try {
      await toggleLike({ variables: { id } });
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <div className="md:hidden pt-4 pb-6">
            <Link to="/">
              <img src="/icons/Question-mark-circle.svg" alt="arrow back" />
            </Link>
          </div>
          <div className="relative flex flex-col gap-2">
            <img
              src={data?.GetDetailPerson.image}
              alt="Abadango Cluster Princess"
              className="h-20 w-20 rounded-full"
            />
            <ButtonLike
              like={data?.GetDetailPerson.like}
              className="absolute left-14 top-12"
              onClick={handleLikeToggle}
            />
            <h2 className="font-bold text-2xl">{data?.GetDetailPerson.name}</h2>
          </div>
          <div className="pt-5">
            <PersonDescription
              title="Specie"
              description={data?.GetDetailPerson.species}
            />
            <PersonDescription
              title="Status"
              description={data?.GetDetailPerson.status}
              className="border-y border-secondaryGrey"
            />
          </div>
          <FormComment
            personId={personId}
            onCommentAdded={handleCommentAdded}
          />
          <h3 className="mt-4 font-bold">Comments</h3>
          <div className="mt-2 border-t">
            {commentsLoading ? (
              <Loading />
            ) : (
              commentsData?.GetCommentsPerson.map(({ id, text }: Comment) => (
                <div key={id} className="p-2 border-b last:border-b-0">
                  <p>{text}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CharacterDetail;
