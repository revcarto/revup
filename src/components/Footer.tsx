import React from 'react';
import { Gauge } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 border-t border-border">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-md bg-primary/15 border border-primary/30">
                <Gauge className="h-4 w-4 text-primary" />
              </div>
              <span className="font-bold">RevUp™</span>
            </div>
            <p className="text-sm text-gray-400 max-w-sm">
              A RevCarto product. Your entire revenue engine, mapped, scored, and fixed — in 30 days.
            </p>
          </div>
          <div className="text-sm text-gray-400 space-y-1">
            <div>
              <a href="mailto:jason@revcarto.com" className="hover:text-primary transition-colors">
                jason@revcarto.com
              </a>
            </div>
            <div>RevCarto — Revenue Operations Consulting</div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-sm text-gray-500">
          © {new Date().getFullYear()} RevCarto. RevUp™ and RevPod™ are RevCarto products.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
