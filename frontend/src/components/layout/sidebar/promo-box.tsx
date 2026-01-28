import { Button } from "@/components/ui/button";

interface PromoBoxProps {
  mobile?: boolean;
  onItemClick?: () => void;
  isCollapsed?: boolean;
}

export function PromoBox({
  mobile: _mobile, // underscore = intentionally unused
  onItemClick,
  isCollapsed: _isCollapsed, // underscore = intentionally unused
}: PromoBoxProps) {
  return (
    <div className="space-y-8 relative mx-4 mb-6 mt-10 rounded-xl bg-secondary text-secondary-foreground text-center pt-12 pb-8 px-4">
      {/* Floating Logo */}
      <div className="absolute -top-11 left-1/2 -translate-x-1/2 border border-gray-300 rounded-full shadow-xs mb-6 p-3 bg-secondary text-secondary-foreground">
        <div className="w-16 h-16 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 100 100.026"
          >
            <path
              fill="#F0C419"
              d="M54 20c-14.359 0-26 11.64-26 26c0 3.887.859 7.568 2.388 10.882l-3.534 3.533c-.913.913-.86 5.54-.867 5.608c-.04.041-4.297-.443-5.235.494l-1.879 1.961c-1.196 1.197-.924 5.596-.945 5.521l-.005.006c.014.003-4.301-.357-5.217.557l-2.111 2.112c-.936.937-.696 5.353-.682 5.343c.005-.006-4.482-.14-4.953.291C1.995 85.021 0 87.27 0 87.27l.018 12.756c0 .008 12.712-.023 12.712-.023l30.388-30.391A25.885 25.885 0 0 0 54 72c14.359 0 26-11.643 26-26c0-14.359-11.641-26-26-26zm6.741 13.481a5.778 5.778 0 1 1 1.237 11.42a5.975 5.975 0 0 1-5.215-1.665a5.977 5.977 0 0 1-1.664-5.213a5.778 5.778 0 0 1 5.642-4.542z"
            />
            <path
              fill="#F29C1F"
              d="M66.652 33.314a8.019 8.019 0 0 0-11.338 0a8.02 8.02 0 0 0 0 11.337a8.015 8.015 0 0 0 11.338 0a8.016 8.016 0 0 0 0-11.337zM64.5 42.499a4.994 4.994 0 1 1-7.062-7.064a4.992 4.992 0 0 1 7.062 0a4.993 4.993 0 0 1 0 7.064zM37.864 66.378a26.11 26.11 0 0 1-2.249-1.994L.018 99.98v.043c0 .002 1.887 0 4.206-.006l33.64-33.639z"
            />
            <path
              fill="#EBEEEE"
              d="M75.967 0C64.055 0 54.174 8.682 52.294 20.061A26.767 26.767 0 0 1 54 20c1.089 0 2.159.075 3.212.206c1.763-8.75 9.488-15.34 18.755-15.34c10.567 0 19.135 8.565 19.135 19.134c0 10.567-8.564 19.134-19.135 19.134c-6.839 0-12.822-3.6-16.207-8.996a4.962 4.962 0 0 0-2.324 1.296a4.932 4.932 0 0 0-1.246 2.158C60.518 43.877 67.76 48 75.967 48c13.254 0 24-10.745 24-24c0-13.254-10.744-24-24-24z"
            />
            <path
              fill="#C8C9CB"
              d="M61.104 36.017a19.84 19.84 0 0 1-1.344-1.879a5.423 5.423 0 0 0-.627.198l-.006.002a5.413 5.413 0 0 0-.559.259l-.287.177l-.262.168c-.188.14-.371.29-.543.458l-.074.073a5.015 5.015 0 0 0-.44.523l-.183.276l-.141.229a5.16 5.16 0 0 0-.449 1.088c.451.655.938 1.28 1.453 1.886l3.462-3.458z"
            />
          </svg>
        </div>
      </div>

      {/* Content */}
      <h3 className="text-base font-semibold mt-4">TrendyCoder</h3>
      <p className="text-sm font-thin tracking-wider py-3 mt-2 mb-4">
        Unlock premium components and advanced analytics.
      </p>
      <Button
        size="lg"
        onClick={onItemClick}
        className="w-full text-lg font-semibold rounded-xl shadow-md bg-linear-to-br from-primary to-secondary text-secondary-foreground border-2 border-secondary hover:from-secondary hover:to-primary hover:scale-[1.04] transition-all duration-200 cursor-pointer ring-2 ring-accent/40 dark:ring-secondary/60 dark:bg-gradient-to-br dark:from-primary dark:to-secondary-foreground"
      >
        <span className="inline-flex items-center gap-2">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-400"><path d="M12 2l2.317 7.808 8.183.067-6.6 4.826 2.52 7.757L12 16.077 5.58 22.458l2.52-7.757-6.6-4.826 8.183-.067z"/></svg>
          Get Pro
        </span>
      </Button>
    </div>
  );
}
