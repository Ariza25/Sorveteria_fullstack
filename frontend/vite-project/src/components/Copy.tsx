const Copy = () => {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <p className="bg-red-700 flex justify-center p-2.5 text-yellow-50 text-sm">
        Desenvolvido por
        <a
          className="px-1 hover:text-yellow-200"
          href="https://matheusariza.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Matheus Ariza.
        </a>
        &copy;{currentYear}
      </p>
    </>
  );
};

export default Copy;
