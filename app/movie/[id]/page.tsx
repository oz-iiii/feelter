interface PageProps {
  params: {
    id: string;
  };
}

export default function Page({ params }: PageProps) {
  return <div>Movie ID: {params.id}</div>;
}