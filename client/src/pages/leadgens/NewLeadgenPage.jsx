import { useRouteLoaderData,json,redirect } from "react-router-dom";
import React from "react";
import { baseLeadgensURL } from "@/utils/data/url";
import LeadgenForm from "@/components/leadgen/LeadgenForm";

const NewLeadgenPage = () => {
  return (
    <>
      <LeadgenForm />
    </>
  );
};

export default NewLeadgenPage;

export async function createLeadgenAction({ request }) {
  const formData = await request.formData();
  console.log(formData)
  console.log(formData.entries)
   const leadgenData = {
     title: formData.get('title'),
     flowName: formData.get('flowName'),
     questions: JSON.parse(formData.get('questions')),
   };

  console.log(leadgenData)

    const response = await fetch(baseLeadgensURL + "new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(leadgenData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData)
      return json(errorData, { status: response.status });
    }
    const res = await response.json();
    console.log("success:", res)
    localStorage.removeItem('leadgenFormData');
    return redirect(`/leadgens/${res.token}`); 
  
}