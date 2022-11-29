import { useCallback, useState } from "react";
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
      // console.log("results: ", results);

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
// const { load: justCreateLoader, trigger: justificationSubmit } = usePostMethod()
// justificationSubmit({
//     url: "/medical/justification",
//     token: token,
//     doAfterSuccess: () => {
//         getMedicalJustResults({
//             url: "/medical/justification",
//             objFilters: { idAccount: idEnterprise, search: filters.search },
//             token: token,
//         })

//         setJustification({
//             isEditing: false,
//             isDeleting: false,
//             showModal: false,
//             pbjDescription: "",
//             pbjName: "",
//             pbjId: "",
//             selectedMedicines: [],
//             selectedJustifications: []
//         })
//     },
//     successAlert: () => message('success', "Éxito", `Justificación PBS ${justification.isEditing ? 'actualizada' : 'creada'}`),
//     method: justification.isEditing ? "PUT" : "POST",

//     body: {
//         pbjName: justification.pbjName,
//         pbjDescription: justification.pbjDescription,
//         medicines: justification.isEditing ? justification.arrIdMed : justification.selectedMedicines,
//         diagnostics: justification.isEditing ? justification.arrIdDiag : justification.selectedJustifications,
//         idAccount: idEnterprise,
//         pbjId: justification.pbjId || ""
//     },
// })
// export const usePostMethod = () => {
//   const [results, setResults] = useState({});
//   const [load, setLoad] = useState(false);
//   useEffect(() => {
//     setResults({});
//   }, []);

//   const fetchPost = async (fetchProps) => {
//     let {
//       url,
//       token,
//       method,
//       body,
//       succesAction,
//       doAfterException,
//       doAfterSuccess,
//       noAlert = false,
//       noErrorAlert = false,
//     } = fetchProps;
//     if (isEmptyOrUndefined(url)) {
//       setLoad(false);
//       return alert(
//         "warning",
//         "Parámetro url no encontrado",
//         "El parámetro url es obligatorio en el objeto de configuración"
//       );
//     }
//     if (isEmptyOrUndefined(token)) {
//       setLoad(false);
//       return alert(
//         "warning",
//         "Parámetro token no encontrado",
//         "El parámetro token es obligatorio en el objeto de configuración"
//       );
//     }
//     setLoad(true);
//     try {
//       const query = await fetch(`${URL_GATEWAY}${API_VERSION}${url}`, {
//         method: method,
//         headers: {
//           Authorization: token,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(fetchProps.body ? fetchProps.body : body),
//       });
//       let results = await query.json();
//       if (results.success) {
//         setLoad(false);
//         setResults(results);
//         !!doAfterSuccess && doAfterSuccess(results);
//         return !!succesAction
//           ? succesAction(results)
//           : !noAlert &&
//               alert(
//                 "success",
//                 `<span class=${tableStyles.ordClearBlueText} > ${
//                   results.title || "Proceso completado"
//                 } </span>`,
//                 results.message
//               );
//       } else {
//         setLoad(false);
//         return !!doAfterException
//           ? doAfterException(results)
//           : !noErrorAlert &&
//               alert("warning", results.title || "Advertencia", results.message);
//       }
//     } catch (error) {
//       setLoad(false);
//       console.error(error);
//       return alert("error", "Error", "Ha ocurrido un error POST");
//     }
//   };

//   const trigger = useCallback((fetchProps) => {
//     fetchPost(fetchProps);
//   }, []);
//   return { load, results, trigger };
// };
