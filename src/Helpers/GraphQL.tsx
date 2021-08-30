import React, { useContext, useState, useEffect } from "react";
import Axios from "axios";
import { useTranslation } from "react-i18next";

import { ApolloClient, createHttpLink, DocumentNode, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import { UserContext } from "../context";

export const useApolloClient = () => {
  const user = useContext(UserContext);

  if (!user) return;

  const httpLink = createHttpLink({
    uri: "https://us-east-1.aws.realm.mongodb.com/api/client/v2.0/app/medkit-cxpjw/graphql",
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        Authorization: `Bearer ${user.accessToken}`,
      },
    };
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};

export const useGraphQL = () => {
  const user = useContext(UserContext);

  if (!user) return;

  return (query : DocumentNode) => {
    console.log("gql query", typeof query, query);

    return Axios.request({
      method: "post",
      url: "https://us-east-1.aws.realm.mongodb.com/api/client/v2.0/app/medkit-cxpjw/graphql",
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
      data: { query },
    });
  };
};

export const useQueryResult = (query : DocumentNode) : {loading: boolean, data?: any, error?: Error} => {
  const [result, setResult] = useState({ loading: true });
  const [error, setError] = useState();

  const client = useApolloClient();

  const runQuery = async () => {
    try {
      if (client) {
        setResult(await client.query({ query }));
      }
    } catch (e) {
      setError(e);
    }
  };

  useEffect(() => {
    if (client) runQuery();
  }, [query]);

  return { ...result, error };
};

// export const usePatientInfo = (patientId: string) => {
//   const { t } = useTranslation();

//   const [patient, setPatient] = useState();
//   const [error, setError] = useState();

//   const gql = useGraphQL();

//   const queryPatientData = async () => {
//     const {
//       status,
//       data: { data },
//     } = await gql(`
//       {
//           patient(query: {_id: "${patientId}"}) {
//               _id
//               firstName
//               middleName
//               firstSurname
//               secondSurname
//               gender
//               birthDate
//               occupation
//               maritalStatus
//       }
//     }`);

//     if (status === 200) {
//       if (data.patient) setPatient(data.patient);
//       else setError({ message: t("Patient not Found") });
//     }
//   };

//   useEffect(() => {
//     queryPatientData();
//   }, [patientId]);

//   return { patient, error };
// };
