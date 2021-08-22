import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import _get from "lodash/get";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import "./App.css";

function App() {
  const schema = yup.object().shape({
    fullName: yup.string().required("Bạn phải nhập họ tên"),
    movie: yup.object().typeError("Bạn phải chọn phim"),
    showAge: yup.boolean(),
    age: yup.string().when("showAge", {
      is: true,
      then: yup.string().required("Bạn phải nhập tuổi"),
      otherwise: yup.string(),
    }),
    // .test("checkAge", "bạn phải nhập age", function checkAge(value) {
    //   const { parent } = this;
    //   console.log("parent,parent", parent);
    //   if (parent.showAge) {
    //     return true;
    //   }
    // }),
  });

  const {
    formState: { errors },
    control,
    register,
    handleSubmit,
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const watchShowAge = watch("showAge", false);
  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };
  console.log("watchShowAge", watchShowAge);
  return (
    <Box display="flex" justifyContent="center" mt={5}>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "50vw" }}>
        <TextField
          // name="fullName"
          // inputRef={register}
          {...register("fullName")}
          label="Họ và tên"
          placeholder="Nhập họ tên"
          fullWidth
          variant="outlined"
          helperText={
            _get(errors, "fullName") && _get(errors, "fullName.message")
          }
          error={!!_get(errors, "fullName")}
          defaultValue=""
        />
        <br />
        <br />
        <Controller
          name="showAge"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(e, data) => field.onChange(e.target.checked)}
                  checked={watchShowAge}
                  // value={field.value}
                />
              }
              label="Tuổi"
            />
          )}
          defaultValue={false}
        />
        {watchShowAge && (
          <>
            <br />
            <br />
            <TextField
              {...register("age")}
              label="Tuổi"
              placeholder="Nhập tuổi"
              fullWidth
              variant="outlined"
              helperText={_get(errors, "age") && _get(errors, "age.message")}
              error={!!_get(errors, "age")}
              defaultValue={null}
            />
          </>
        )}
        <br />
        <br />
        <Controller
          name="movie"
          control={control}
          render={({ field }) => (
            <Autocomplete
              options={[
                { value: "chocolate", label: "Chocolate" },
                { value: "strawberry", label: "Strawberry" },
                { value: "vanilla", label: "Vanilla" },
              ]}
              getOptionLabel={(option) => option.label}
              onChange={(e, data) => field.onChange(data)}
              value={field.value}
              getOptionSelected={(option, value) =>
                option.label === value.label
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Chọn phim"
                  variant="outlined"
                  helperText={
                    _get(errors, "movie") && _get(errors, "movie.message")
                  }
                  error={!!_get(errors, "movie")}
                />
              )}
            />
          )}
          defaultValue={null}
        />
        <br />
        <br />
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => {
            reset({ movie: null, showAge: false });
          }}
        >
          Nhập lại
        </Button>
        &nbsp; &nbsp;
        <Button type="submit" variant="contained" color="primary">
          Đăng ký
        </Button>
      </form>
    </Box>
  );
}

export default App;
