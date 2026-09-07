type FeatureKey =
  | "categories"
  | "registeredUsers"
  | "allPosts"
  | "allPolls"
  | "usersAndRoll"
  | "websiteConfiguration"
  | "settings";

const permissionColumns: { key: FeatureKey; label: string }[][] = [
  [
    { key: "categories", label: "Categories" },
    { key: "registeredUsers", label: "Registered Users" },
    { key: "allPosts", label: "All Posts" },
  ],
  [
    { key: "allPolls", label: "All Polls" },
    { key: "usersAndRoll", label: "Users & Roll" },
    { key: "websiteConfiguration", label: "Website Configuration" },
  ],
  [{ key: "settings", label: "Settings" }],
];

export default function RoleFormSkeleton() {
  return (
    <div className="w-full animate-pulse">
      {/* Role Name Skeleton */}
      <div className="mb-8">
        <div className="h-4 w-24 bg-[#E9EAEB] rounded mb-2" />
        <div className="w-full max-w-sm h-11 bg-[#E9EAEB] rounded-lg" />
      </div>

      {/* Feature Permission Skeleton */}
      <div>
        <div className="h-6 w-40 bg-[#E9EAEB] rounded mb-4" />

        <div className="flex items-center gap-2 mb-3">
          <div className="h-5 w-5 rounded bg-[#E9EAEB]" />
          <div className="h-4 w-24 bg-[#E9EAEB] rounded" />
        </div>

        <div className="border-t border-[#E9EAEB] pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-4">
            {permissionColumns.map((column, colIdx) => (
              <div key={colIdx} className="flex flex-col gap-4">
                {column.map(({ key }) => (
                  <div key={key} className="flex items-center gap-3">
                    <div className="h-6 w-11 rounded-full bg-[#E9EAEB]" />
                    <div className="h-4 w-28 bg-[#E9EAEB] rounded" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons Skeleton */}
      <div className="mt-8 flex flex-col sm:flex-row gap-3 pt-4 border-t border-[#E9EAEB]">
        <div className="flex-1 h-11 bg-[#E9EAEB] rounded-lg" />
        <div className="flex-1 h-11 bg-[#E9EAEB] rounded-lg" />
      </div>
    </div>
  );
}
