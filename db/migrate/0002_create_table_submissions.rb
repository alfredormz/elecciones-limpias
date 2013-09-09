Sequel.migration do
  change do
    create_table(:submissions) do
      primary_key :id
      Integer  :user_id
      String   :photo_basename
      DateTime :created_at
      DateTime :updated_at
    end
  end
end
