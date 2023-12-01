"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormItem, FormLabel } from "../ui/form";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { proposalFormSchema } from "@/types/zod.schema";
import RHFInput from "../react-hook-form/RHFInput";
import RHFTextarea from "../react-hook-form/RHFTextarea";
import emailjs from "@emailjs/browser";
import { useToast } from "@/components/ui/use-toast";
import RHFradio from "../react-hook-form/RHFRadio";
import { RadioGroupItem } from "../ui/radio-group";

const ProposalForm = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof proposalFormSchema>>({
    resolver: zodResolver(proposalFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      age: "",
      gender: "",
      mobileNumber: "",
      address: "",
      experience: "",
      location: "",
      skills: [],
      email: "",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    emailjs
      .send("service_57mk83w", "template_uckwqs9", data, "HkRr4Zmamy8axmFd5")
      .then((result) => {
        toast({
          title: "Proposal for franchise submitted",
          description: "We will contact you soon.",
        });
      })
      .catch((error) => {
        toast({
          title: "Error submitting proposal",
          description: "We are getting some error. Please try again.",
        });
      });
  };

  // Map

  return (
    <div className=" p-5 sm:p-8 shadow-lg   rounded-lg max-w-4xl mx-auto  bg-white ">
      <h1 className=" text-xl font-bold">Store Proposal</h1>
      <p className="text-sm text-gray-500  mb-6">
        Provide your details and plans to open up a store for yachu products.
      </p>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className=" grid sm:grid-cols-2 gap-5">
            <RHFInput
              name="firstName"
              label="First Name"
              placeholder="eg. John "
              required
            />
            <RHFInput
              name="lastName"
              label="Last Name"
              placeholder="eg. Doe"
              required
            />
          </div>
          <div className=" grid sm:grid-cols-2 gap-5">
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
          </div>
          <div className=" grid sm:grid-cols-2 gap-5">
            <RHFInput
              name="address"
              label="Temporary Address"
              placeholder="eg. Biratnagar - 2, Morang"
            />
            <RHFInput
              name="age"
              label="Age"
              placeholder="eg. 25"
              type="number"
              required
            />
            <RHFradio name="gender" label="Gender">
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="all" />
                </FormControl>
                <FormLabel className="font-normal">Male</FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="mentions" />
                </FormControl>
                <FormLabel className="font-normal">Female</FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="none" />
                </FormControl>
                <FormLabel className="font-normal">Others</FormLabel>
              </FormItem>
            </RHFradio>
          </div>
          <RHFTextarea
            name="experience"
            label="What were you doing before this?"
            placeholder="Write about your past experience"
            rows={6}
            required
          />
          <div className=" grid sm:grid-cols-2 gap-5">
            <RHFInput
              name="location"
              label="Where are you planning to open the store?"
              placeholder="eg. Biratnagar - 2, Morang"
              required
            />
          </div>
          {/* <StoreLocation /> */}
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
