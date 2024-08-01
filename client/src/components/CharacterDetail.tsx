import ButtonLike from "../common/ButtonLike";
import PersonDescription from "../common/PersonDescription";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_DETAIL_PERSON } from "../services/query/get-detail-person";
import Loading from "../common/Loading";

const CharacterDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading } = useQuery(GET_DETAIL_PERSON, {
    variables: { id },
  });

  return (
    <div className="flex flex-col gap-5 flex-grow">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="relative flex flex-col gap-2">
            <img
              src={data?.character.image}
              alt="Abadango Cluster Princess"
              className="h-20 w-20 rounded-full"
            />
            <ButtonLike className="absolute left-14 top-12" />
            <h2 className="font-bold text-2xl">{data?.character.name}</h2>
          </div>
          <div>
            <PersonDescription
              title="Specie"
              description={data?.character.species}
            />
            <PersonDescription
              title="Status"
              description={data?.character.status}
              className="border-y border-secondaryGrey"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CharacterDetail;
