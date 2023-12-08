import mongodb from "mongoose";

export interface IPreferences extends mongodb.Document {
  user_id: string,
  clef?: string,
  major_keys?: string[],
  n_minor_keys?: string[],
  h_minor_keys?: string[],
  m_minor_keys?: string[],
}

const Preferences = mongodb.models.Preferences || mongodb.model<IPreferences>(
  "Preferences",
  new mongodb.Schema<IPreferences>({
    user_id: {
      type: String,
      required: true
    },
    clef: String,
    major_keys: [String],
    n_minor_keys: [String],
    h_minor_keys: [String],
    m_minor_keys: [String],
  })
);

export default Preferences;