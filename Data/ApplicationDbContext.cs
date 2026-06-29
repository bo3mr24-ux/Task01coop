using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Task01.Models;

namespace Task01.Data;

// Inherits IdentityDbContext so ASP.NET Core Identity tables (users, roles…)
// live in the same database as the conference data.
public class ApplicationDbContext : IdentityDbContext<IdentityUser>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    public DbSet<IndividualRegistration> IndividualRegistrations => Set<IndividualRegistration>();
    public DbSet<SponsorRegistration> SponsorRegistrations => Set<SponsorRegistration>();
    public DbSet<ConferenceSettings> ConferenceSettings => Set<ConferenceSettings>();
    public DbSet<AboutConference> AboutConferences => Set<AboutConference>();
    public DbSet<AgendaItem> AgendaItems => Set<AgendaItem>();
    public DbSet<Speaker> Speakers => Set<Speaker>();
    public DbSet<ConferenceObjective> ConferenceObjectives => Set<ConferenceObjective>();
}
