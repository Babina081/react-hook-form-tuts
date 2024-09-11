import { useForm, useFieldArray, FieldErrors } from "react-hook-form";
import { useEffect } from "react";
import { DevTool } from "@hookform/devtools";

let renderCount = 0;
type FormValues = {
  username: string;
  email: string;
  channel: string;
  social: {
    twitter: string;
    facebook: string;
  };
  phoneNumbers: string[];
  phNumbers: { number: string }[];
  age: number;
  dob: Date;
};

const YoutubeForm = () => {
  const form = useForm<FormValues>({
    // defaultValues: async () => {
    //   const response = await fetch(
    //     "https://jsonplaceholder.typicode.com/users/1"
    //   );
    //   const data = await response.json();
    //   return {
    //     username: "Batman",
    //     email: data.email,
    //     channel: "",
    //   };
    // },
    defaultValues: {
      username: "",
      email: "",
      channel: "",
      social: {
        twitter: "",
        facebook: "",
      },
      phoneNumbers: ["", ""],
      phNumbers: [{ number: "" }],
      age: 0,
      dob: new Date(),
    },
    mode: "onSubmit",
  });

  const {
    register,
    control,
    handleSubmit,
    formState,
    watch,
    getValues,
    setValue,
    reset,
    trigger,
  } = form;
  
  const {
    errors,
    dirtyFields,
    touchedFields,
    isDirty,
    isValid,
    isSubmitting,
    isSubmitted,
    isSubmitSuccessful,
    submitCount,
  } = formState;
  console.log({ errors, dirtyFields, touchedFields, isDirty });
  console.log({ isSubmitting, isSubmitted, isSubmitSuccessful, submitCount });

  const { fields, append, remove } = useFieldArray({
    name: "phNumbers",
    control,
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form Submitted", data);
  };

  const onError = (errors: FieldErrors<FormValues>) => {
    console.log("Form error", errors);
  };

  const handleGetValues = () => {
    console.log("Get Values", getValues());
    console.log("Get Values", getValues("social.facebook"));
  };

  const handleSetValue = () => {
    setValue("username", "Batman", {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  // const watchForm = watch();

  useEffect(() => {
    const subscription = watch((value) => {
      console.log(value);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  renderCount++;

  return (
    <div>
      <h1>Youtube Form ({renderCount / 2})</h1>
      {/* <h2>Watched Value: {JSON.stringify(watchForm)}</h2> */}
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            // disabled
            {...register("username", {
              required: {
                value: true,
                message: "Username is required",
              },
            })}
          />
          <p className="error">{errors.username?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            {...register("email", {
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
              validate: {
                notAdmin: (fieldValue) => {
                  return (
                    fieldValue !== "admin@example.com" ||
                    "Enter a different email address"
                  );
                },
                notBlackListed: (fieldValue) => {
                  return (
                    !fieldValue.endsWith("baddomain.com") ||
                    "the domain is not supported"
                  );
                },
                emailAvailable: async (fieldValue) => {
                  const response = await fetch(
                    `http://jsonplaceholder.typicode.com/users?email=${fieldValue}`
                  );
                  const data = await response.json();
                  return data.length == 0 || "Email already exists";
                },
              },
            })}
          />
          <p className="error">{errors.email?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <input
            type="text"
            id="channel"
            {...register("channel", {
              required: {
                value: true,
                message: "Channel is required",
              },
            })}
          />
          <p className="error">{errors.channel?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="twitter">Twitter</label>
          <input
            type="text"
            id="twitter"
            {...register("social.twitter", {
              disabled: watch("channel") === "",
              required: "Enter twitter",
            })}
          />
        </div>
        <div className="form-control">
          <label htmlFor="facebook">Facebook</label>
          <input type="text" id="facebook" {...register("social.facebook")} />
        </div>
        <div className="form-control">
          <label htmlFor="primary-phone">Primary phone number</label>
          <input
            type="text"
            id="primary-phone"
            {...register("phoneNumbers.0")}
          />
        </div>
        <div className="form-control">
          <label htmlFor="secondary-phone">Secondary phone number</label>
          <input
            type="text"
            id="secondary-phone"
            {...register("phoneNumbers.1")}
          />
        </div>
        <div>
          <label htmlFor="">List of phone numbers</label>
          <div>
            {fields.map((field, index) => {
              return (
                <div className="form-control" key={field.id}>
                  <input
                    type="text"
                    {...register(`phNumbers.${index}.number` as const)}
                  />
                  {index > 0 && (
                    <button type="button" onClick={() => remove(index)}>
                      Remove phone Number
                    </button>
                  )}
                </div>
              );
            })}
            <button type="button" onClick={() => append({ number: "" })}>
              Add phone Number
            </button>
          </div>
        </div>
        <div className="form-control">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            {...register("age", {
              valueAsNumber: true,
              required: {
                value: true,
                message: "Age is required",
              },
            })}
          />
          <p className="error">{errors.age?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="dob">Date of birth</label>
          <input
            type="date"
            id="dob"
            {...register("dob", {
              valueAsDate: true,
              required: {
                value: true,
                message: "Date of birth is required",
              },
            })}
          />
          <p className="error">{errors.dob?.message}</p>
        </div>
        <button disabled={!isDirty || !isValid || isSubmitting}>Submit</button>
        <button type="button" onClick={() => reset()}>
          Reset
        </button>

        <button>Submit</button>
        <button onClick={handleGetValues}>Get Values</button>
        <button onClick={handleSetValue}>Set Value</button>
        <button type="button" onClick={() => trigger()}>
          Validate
        </button>
      </form>
      <DevTool control={control}></DevTool>
    </div>
  );
};

export default YoutubeForm;
