// Legacy inventory detail pages redirect to main inventory
export default function InventorySlugRedirect() {
  return null;
}

export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/inventory",
      permanent: false,
    },
  };
}
