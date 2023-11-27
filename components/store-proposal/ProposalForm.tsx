"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { proposalFormSchema } from "@/types/zod.schema";
import RHFInput from "../react-hook-form/RHFInput";
import RHFTextarea from "../react-hook-form/RHFTextarea";
import Map from "react-map-gl";
import { mapboxAccessToken } from "@/constants/constant";
import GeocoderControl from "../map/geocoder-control";
import "../../styles/map.css";
import { useMapCoordinate } from "@/context/MapCoordinateProvider";

const ProposalForm = () => {
  const form = useForm<z.infer<typeof proposalFormSchema>>({
    resolver: zodResolver(proposalFormSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      age: "",
      gender: "",
      landlineNumber: "",
      mobileNumber: "",
      temporaryAddress: "",
      permanentAddress: "",
      experience: "",
      skills: [],
      email: "",
    },
  });

  const {
    handleSubmit,

    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    window.alert("message sent");
  };

  // Map
  const { latLng } = useMapCoordinate();

  return (
    <div className=" p-5 sm:p-8 shadow-lg rounded-lg max-w-4xl mx-auto ">
      <div className="  h-96">
        <Map
          initialViewState={{
            longitude: -79.4512,
            latitude: 43.6568,
            zoom: 13,
          }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          mapboxAccessToken={mapboxAccessToken}
          style={{
            height: "100%",
            width: "100%",
          }}
        >
          <GeocoderControl
            position="top-left"
            mapboxAccessToken={mapboxAccessToken || ""}
            marker
          />
        </Map>
      </div>
      <div className="my-4">
        <h4 className="font-bold">Location</h4>
        Latitude: {latLng.lat} Longitude{latLng.lng}
      </div>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className=" grid grid-cols-3 gap-5">
            <RHFInput
              name="firstName"
              label="First Name"
              placeholder="eg. John "
              required
            />
            <RHFInput
              name="middleName"
              label="Middle Name"
              placeholder="eg. Kumar"
            />
            <RHFInput
              name="lastName"
              label="Last Name"
              placeholder="eg. Doe"
              required
            />
          </div>
          <div className=" grid grid-cols-3 gap-5">
            <RHFInput
              name="email"
              label="Email Address"
              placeholder="eg. John Doe"
              type="email"
              required
            />
            <RHFInput
              name="mobileNumber"
              label="Mobile Number"
              placeholder="eg. 986543665"
              type="number"
              required
            />
            <RHFInput
              name="landlineNumber"
              label="Landline Number"
              placeholder="eg. 01-2323234"
            />
          </div>
          <div className=" grid grid-cols-2 gap-5">
            <RHFInput
              name="temporaryAddress"
              label="Temporary Address"
              placeholder="eg. Biratnagar - 2, Morang"
            />
            <RHFInput
              name="permanentAddress"
              label="Permanent Address"
              placeholder="eg. New Baneshwor, Kathmandu"
              required
            />
          </div>
          <RHFTextarea
            name="experience"
            label="What were you doing before this?"
            placeholder="Write about your past experience"
            rows={6}
            required
          />
          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProposalForm;
