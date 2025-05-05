import { AxiosInstance } from "@/Axios/AxiosInstance";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ResumeState {
  resume: any;
  loading: boolean;
  error: string | null;
}

interface TemplatePayload {
  templateNumber: number;
}

interface ResumeDataPayload {
  resumeId: string;
  data: any;
}

interface ChangeTemplatePayload {
  resumeId: string;
  templateNumber: number;
}

const initialState: ResumeState = {
  resume: {},
  loading: false,
  error: null,
};

export const SelectResumeTemplate = createAsyncThunk(
  "resume/templates",
  async (templateNumber: number, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post(
        "http://localhost:5000/api/resume/select-template",
        {
          templateNumber,
        }
      );
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.message || "Failed to select template"
      );
    }
  }
);

export const SavePersonalDetails = createAsyncThunk(
  "resume/personal-details",
  async (data: ResumeDataPayload, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post(
        `http://localhost:5000/api/resume/personal-info/${data.resumeId}`,
        data.data
      );
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.message || "Failed to save personal details"
      );
    }
  }
);

export const SaveEducationInfo = createAsyncThunk(
  "resume/edu-details",
  async (data: ResumeDataPayload, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post(
        `http://localhost:5000/api/resume/edu-details/${data.resumeId}`,
        data.data
      );
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.message || "Failed to save education info"
      );
    }
  }
);

export const SaveExperienceDetails = createAsyncThunk(
  "resume/expr-details",
  async (data: ResumeDataPayload, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post(
        `http://localhost:5000/api/resume/expr/${data.resumeId}`,
        data.data
      );
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.message || "Failed to save experience"
      );
    }
  }
);

export const SaveSkillsDetails = createAsyncThunk(
  "resume/skills",
  async (data: ResumeDataPayload, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post(
        `http://localhost:5000/api/resume/skills/${data.resumeId}`,
        { Skills: data.data }
      );
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.message || "Failed to save skills"
      );
    }
  }
);

export const SaveProjectDetails = createAsyncThunk(
  "resume/projects",
  async (data: ResumeDataPayload, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post(
        `http://localhost:5000/api/resume/projects/${data.resumeId}`,
        { Projects: data.data }
      );
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.message || "Failed to save projects"
      );
    }
  }
);

export const SaveAboutDetails = createAsyncThunk(
  "resume/summary",
  async (data: ResumeDataPayload, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post(
        `http://localhost:5000/api/resume/background/${data.resumeId}`,
        { background: data.data }
      );
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.message || "Failed to save summary"
      );
    }
  }
);

export const ChangeResumeTemplate = createAsyncThunk(
  "/resume/change-temp",
  async (data: ChangeTemplatePayload, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post(
        `http://localhost:5000/api/resume/change-temp/${data.resumeId}`,
        { templateNumber: data.templateNumber }
      );
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.message || "Failed to change template"
      );
    }
  }
);

export const GetResumeById = createAsyncThunk(
  "resume/get",
  async (resumeId: string, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get(
        `http://localhost:5000/api/resume/get-resume/${resumeId}`
      );
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.message || "Failed to get resume");
    }
  }
);

const ResumeSlice = createSlice({
  name: "Resume",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetResumeById.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetResumeById.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.resume = action.payload;
        state.error = null;
      })
      .addCase(GetResumeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(SelectResumeTemplate.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        SelectResumeTemplate.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.resume = action.payload;
          state.error = null;
        }
      )
      .addCase(SelectResumeTemplate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(SavePersonalDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        SavePersonalDetails.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.resume = action.payload;
        }
      )
      .addCase(SavePersonalDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(SaveEducationInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        SaveEducationInfo.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.resume = action.payload;
        }
      )
      .addCase(SaveEducationInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(SaveExperienceDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        SaveExperienceDetails.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.resume = action.payload;
        }
      )
      .addCase(SaveExperienceDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(SaveSkillsDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        SaveSkillsDetails.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.resume = action.payload;
        }
      )
      .addCase(SaveSkillsDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(SaveProjectDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        SaveProjectDetails.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.resume = action.payload;
        }
      )
      .addCase(SaveProjectDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(SaveAboutDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        SaveAboutDetails.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.resume = action.payload;
        }
      )
      .addCase(SaveAboutDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(ChangeResumeTemplate.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        ChangeResumeTemplate.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.resume = action.payload;
        }
      )
      .addCase(ChangeResumeTemplate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// export {
//   SelectResumeTemplate,
//   GetResumeById,
//   SavePersonalDetails,
//   SaveEducationInfo,
//   ChangeResumeTemplate,
//   SaveExperienceDetails,
//   SaveSkillsDetails,
//   SaveProjectDetails,
//   SaveAboutDetails,
// };

export default ResumeSlice.reducer;
