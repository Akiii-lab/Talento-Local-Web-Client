import { JobCardProps } from "@/types/jobs/JobCard.types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, MapPin, Calendar, Briefcase, Clock, DollarSign } from "lucide-react";
import { useState } from "react";

export function JobCard({ job, onClick, className }: JobCardProps) {
  const [favorited, setFavorited] = useState(false);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Hoy";
    if (diffDays === 1) return "Ayer";
    if (diffDays < 7) return `Hace ${diffDays} días`;
    return date.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' });
  };

  return (
    <Card
      onClick={onClick}
      className={`p-5 hover:shadow-xl transition-all cursor-pointer border border-gray-200 hover:border-blue-300 ${className ?? ""}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex gap-2 flex-wrap">
          {job.status === "Destacado" && (
            <Badge className="bg-blue-600 text-white text-xs font-semibold">
              ⭐ Destacado
            </Badge>
          )}
          {job.status === "Urgente" && (
            <Badge variant="destructive" className="text-xs text-white font-semibold">
              🔥 Urgente
            </Badge>
          )}
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 hover:bg-red-50"
          onClick={(e) => {
            e.stopPropagation();
            setFavorited(!favorited);
          }}
        >
          <Heart 
            size={18} 
            className={`transition-colors ${favorited ? "fill-red-500 text-red-500" : "text-gray-400 hover:text-red-500"}`} 
          />
        </Button>
      </div>

      <div className="mb-3">
        <h3 className="font-bold text-lg text-gray-900 mb-1 line-clamp-2">{job.title}</h3>
        {job.subTitle && (
          <p className="text-sm text-gray-600 line-clamp-1">
            {job.subTitle}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="flex items-center gap-2">
          <MapPin size={16} className="text-blue-600 shrink-0" />
          <span className="text-sm text-gray-700 truncate">{job.location}</span>
        </div>

        {job.salary && (
          <div className="flex items-center gap-2">
            <DollarSign size={16} className="text-green-600 shrink-0" />
            <span className="text-sm font-semibold text-green-700 truncate">
              ${job.salary.toLocaleString('es-CO')}
            </span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Briefcase size={16} className="text-purple-600 shrink-0" />
          <span className="text-xs text-gray-600 truncate">{job.modality}</span>
        </div>

        <div className="flex items-center gap-2">
          <Clock size={16} className="text-orange-600 shrink-0" />
          <span className="text-xs text-gray-600 truncate">{job.journey}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Calendar size={14} />
          <span>{formatDate(job.publicationDate)}</span>
        </div>
        <div className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
          {job.paymentType}
        </div>
      </div>
    </Card>
  );
}
