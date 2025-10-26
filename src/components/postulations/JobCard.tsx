import { JobCardProps } from "@/types/postulations/JobCard.types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, HeartIcon, MapPinIcon, MoreVerticalIcon } from "lucide-react";
import { useState } from "react";

export function JobCard({ job, onClick, className }: JobCardProps) {
  const [favorited, setFavorited] = useState(false);
  return (
    <Card
      onClick={onClick}
      className={`p-4 hover:shadow-lg transition-shadow cursor-pointer ${className ?? ""}`}
    >
      {/* Header con badges */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex gap-2">
          {job.featured && (
            <Badge className="bg-blue-500 text-white text-xs">
              Empleo destacado
            </Badge>
          )}
          {job.urgent && (
            <Badge variant="destructive" className="text-xs text-white">
              Se precisa Urgente
            </Badge>
          )}
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8 hover:cursor-pointer"
          onClick={()=> setFavorited(!favorited)}
        >
          <Heart size={16} className={favorited ? "text-red-500" : "text-gray-400"} />
        </Button>
      </div>

      {/* Título y empresa */}
      <h3 className="font-bold text-lg mb-1">{job.title}</h3>
      {job.subtitle && (
        <p className="text-sm font-semibold text-gray-700 mb-1">
          {job.subtitle}
        </p>
      )}
      <div className="flex items-center gap-2 mb-2">
        {job.rating && (
          <div className="flex items-center gap-1">
            <span className="font-semibold text-sm">{job.rating}</span>
            <span className="text-yellow-500">★</span>
          </div>
        )}
        <p className="text-sm text-gray-600">{job.company}</p>
      </div>

      {/* Ubicación */}
      <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
        <MapPinIcon size={16} />
        <span>{job.location}</span>
      </div>

      {/* Salario */}
      {job.salary && (
        <p className="text-sm font-semibold text-green-700 mb-3">
          {`$ ${job.salary.toLocaleString('es-CO')} (${job.payType ?? 'Mensual'})`}
        </p>
      )}

      {/* Tiempo de publicación */}
      <p className="text-xs text-gray-500 mb-3">{job.postedTime}</p>
    </Card>
  );
}
