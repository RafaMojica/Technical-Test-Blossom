import ButtonLike from "../common/ButtonLike";
import PersonDescription from "../common/PersonDescription";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { GET_DETAIL_PERSON } from "../services/query/get-detail-person";
import Loading from "../common/Loading";
import { TOGGLE_LIKE } from "../services/mutations/toggle-like";

const CharacterDetail = () => {
  const [toggleLike] = useMutation(TOGGLE_LIKE);
  const { id } = useParams<{ id: string }>();
  const { data, loading } = useQuery(GET_DETAIL_PERSON, {
    variables: { id },
  });

  const handleLikeToggle = async () => {
    try {
      await toggleLike({ variables: { id } });
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  return (
    <div className="hidden md:block md:flex-grow">
      {loading ? (
        <Loading />
      ) : (
        <div>
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
        </div>
      )}
    </div>
  );
};

export default CharacterDetail;
