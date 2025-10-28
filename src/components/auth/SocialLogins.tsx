import { Button } from '@/components/ui/button'

export const SocialLogins = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="h-px flex-grow bg-slate-300 dark:bg-slate-700" />
        <span className="text-sm text-slate-500 dark:text-slate-400">
          or continue with
        </span>
        <div className="h-px flex-grow bg-slate-300 dark:bg-slate-700" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="outline"
          className="h-12 w-full rounded-lg border-slate-300 bg-white text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
        >
          <img
            src="https://img.usecurling.com/i?q=google&color=multicolor"
            alt="Google"
            className="mr-2 h-5 w-5"
          />
          Google
        </Button>
        <Button
          variant="outline"
          className="h-12 w-full rounded-lg border-slate-300 bg-white text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
        >
          <img
            src="https://img.usecurling.com/i?q=facebook&color=multicolor"
            alt="Facebook"
            className="mr-2 h-5 w-5"
          />
          Facebook
        </Button>
      </div>
    </div>
  )
}
