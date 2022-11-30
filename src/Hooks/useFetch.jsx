import { useCallback, useEffect, useState } from "react";
import { supabase } from "../Api/supaBaseClient";
import {
  convertFilterToString,
  isEmptyOrUndefined,
} from "../components/helpers/helpers";

/* --------------------------- How to use example --------------------------- */
// const { results: chemicalSubstances, load: chemicalSubsLoader, trigger: getChemicalSubs } = useGetMethod()
// useEffect(async () => {
//     getChemicalSubs({
//         url: '/medical/medicine/',
//         objFilters: { idAccount: idEnterprise },
//         token: token,
//     })
//     // eslint-disable-next-line react-hooks/exhaustive-deps
// }, [])
export const useGetMethod = () => {
  const [results, setResults] = useState({});
  const [load, setLoad] = useState(false);

  const fetchGet = async (configJson) => {
    let { url, doAfterSuccess, params } = configJson;
    const filters = convertFilterToString(params);
    if (isEmptyOrUndefined(url)) {
      setLoad(false);
      return alert(
        "Parámetro url no encontrado, el parámetro url es obligatorio en el objeto de configuración"
      );
    }
    setLoad(true);
    try {
      const query = await fetch(`${supabase.supabaseUrl}${url}?${filters}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          apikey: supabase.supabaseKey,
        },
      });
      let results = await query.json();

      !!doAfterSuccess && doAfterSuccess(results);
      setLoad(false);
      setResults(results);
      return results;
    } catch (error) {
      setLoad(false);
      return console.error(error.message);
    }
  };
  const trigger = useCallback((configJson) => {
    return fetchGet(configJson);
  }, []);
  return { load, results, trigger };
};
/* ---------------------------------- POST ---------------------------------- */
export const usePostMethod = () => {
  const [results, setResults] = useState({});
  const [load, setLoad] = useState(false);
  useEffect(() => {
    setResults({});
  }, []);

  const fetchPost = async (fetchProps) => {
    let {
      url,
      method,
      body,
      params,
      doAfterException,
      doAfterSuccess,
      // noAlert = false,
      // noErrorAlert = false,
    } = fetchProps;
    if (isEmptyOrUndefined(url)) {
      setLoad(false);
      return alert(
        "El parámetro url es obligatorio en el objeto de configuración"
      );
    }
    const filters = convertFilterToString(params);
    setLoad(true);
    try {
      const query = await fetch(`${supabase.supabaseUrl}${url}?${filters}`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          apikey: supabase.supabaseKey,
        },
        body: JSON.stringify(fetchProps.body ? fetchProps.body : body),
      });
      if (query.ok) {
        setLoad(false);
        setResults(query);
        !!doAfterSuccess && doAfterSuccess(query);
      } else {
        setLoad(false);
        return !!doAfterException && doAfterException(query);
      }
    } catch (error) {
      setLoad(false);
      console.error(error);
      return alert("Ha ocurrido un error POST");
    }
  };

  const trigger = useCallback((fetchProps) => {
    fetchPost(fetchProps);
  }, []);
  return { load, results, trigger };
};
