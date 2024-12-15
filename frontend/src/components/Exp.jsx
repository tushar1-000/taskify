import React from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Exp = () => {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data); // Logs the selected date
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Select Date
          </label>
          <Controller
            name="date"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <DatePicker
                {...field}
                selected={field.value}
                onChange={(date) => field.onChange(date)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                dateFormat="MMMM d, yyyy h:mm aa"
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={30}
              />
            )}
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Exp;
