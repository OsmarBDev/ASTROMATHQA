from django.http import HttpResponseForbidden
from functools import wraps
from Account.models import Profile  # Asegúrate de importar Profile

def role_required(role):
    def decorator(view_func):
        @wraps(view_func)
        def _wrapped_view(request, *args, **kwargs):
            if request.user.is_authenticated:
                try:
                    profile = Profile.objects.get(user=request.user)
                    if profile.tipo.nombreUsuario == role:
                        return view_func(request, *args, **kwargs)
                except Profile.DoesNotExist:
                    pass
            return HttpResponseForbidden("No tienes permiso para acceder a esta página.")
        return _wrapped_view
    return decorator
